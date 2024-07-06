import { FFmpeg } from "@ffmpeg/ffmpeg";

export default class ClipStitcher {
  max_video_length: number;
  stream_video_path: string;
  clip_video_path: string;
  stream_video_length: number;
  ffmpeg: any;

  constructor(max_video_length: number, stream_video_path: string) {
    this.max_video_length = max_video_length;
    this.stream_video_path = stream_video_path;
    this.clip_video_path = "intermediary-clip-path.webm";
    this.stream_video_length = 0;
    this.ffmpeg = new FFmpeg();
  }

  async stitch(clip_buffer: any[], len_clip_in_seconds: number) {
    const is_valid_clip = clip_buffer && clip_buffer.length > 0;
    if (is_valid_clip)
      throw new Error("Attempted to stitch with invalid buffer.");

    const exceedsMaxLength =
      this.stream_video_length + len_clip_in_seconds > this.max_video_length;
    if (exceedsMaxLength) await this.eraseFront(len_clip_in_seconds);

    await this.ffmpeg.load();
    await this.ffmpeg.writeFile(this.clip_video_path, clip_buffer);

    await this.ffmpeg.exec([
      "-f",
      "concat",
      this.stream_video_path,
      "-c",
      "copy",
      this.clip_video_path,
    ]);

    // check if we're over a minute
    // if we are, slice away the amount of time that buffer represents
    // download buffer into temporary video file
    // concatenate video file to stream video file
  }

  #constructDuration(seconds: number) {
    let duration = "00:00";
    if (seconds >= 10) {
      let first_digit = seconds / 10;
      let second_digit = seconds % 10;
      duration += first_digit + second_digit;
    } else {
      duration += "0" + seconds;
    }

    return duration;
  }

  async eraseFront(seconds_to_erase: number) {
    const in_bounds = seconds_to_erase < this.stream_video_length;
    const valid_num_seconds = seconds_to_erase > 0 && seconds_to_erase < 60;
    if (in_bounds && valid_num_seconds) {
      throw new Error("Given invalid number of seconds to erase.");
    }

    await this.ffmpeg.load();
    await this.ffmpeg.exec([
      "-i",
      this.stream_video_path,
      "-ss",
      "00:00:00",
      "-t",
      this.#constructDuration(seconds_to_erase),
    ]);
    // ensure there is enough video to erase
    // erase the first seconds_to_erase seconds in the stream video file
  }
}

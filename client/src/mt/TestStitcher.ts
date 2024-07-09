import Stitcher from "./Stitcher.ts";

export default class TestStitcher implements Stitcher {
  max_video_length: number;
  stream_video_path: string;
  clip_video_path: string;
  stream_video_length: number;

  constructor(max_video_length: number, stream_video_path: string) {
    this.max_video_length = max_video_length;
    this.stream_video_path = stream_video_path;
    this.clip_video_path = "intermediary-clip-path.webm";
    this.stream_video_length = 0;
  }

  async stitch(clip_buffer: any[], len_clip_in_seconds: number): Promise<any> {
    console.log("Clip buffer state: ", clip_buffer);
    console.log("Length of clip to stitch: ", len_clip_in_seconds);

    return Promise.resolve();
  }

  async eraseFront(seconds_to_erase: number): Promise<any> {
    console.log("Seconds to erase: ", seconds_to_erase);

    return Promise.resolve();
  }
}

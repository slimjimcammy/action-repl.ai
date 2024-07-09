export default interface Stitcher {
  max_video_length: number;
  stream_video_path: string;
  clip_video_path: string;
  stream_video_length: number;
  ffmpeg?: any;

  stitch(clip_buffer: any[], len_clip_in_seconds: number): Promise<any>;
  eraseFront(seconds_to_erase: number): Promise<any>;
}

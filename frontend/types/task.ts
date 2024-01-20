import { HLS, Metadata } from "./extra";

export interface Task {
    _id: string;
    created_at: string;
    hls?: HLS;
    index_id: string;
    metadata: Metadata;
    status: string;
    type: string;
    updated_at: string;
    video_id: string;
}

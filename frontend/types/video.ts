import { HLS, Metadata } from './extra';

export interface Video {
    _id: string;
    hls: HLS;
    indexed_at: string;
    metadata: Metadata;
}
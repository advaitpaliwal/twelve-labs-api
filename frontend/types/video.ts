import { HLS, Metadata } from './extra';

export interface Video {
    id: string;
    hls: HLS;
    indexed_at: string;
    metadata: Metadata;
}
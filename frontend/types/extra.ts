export interface HLS {
    status: string;
    thumbnail_urls: string[];
    updated_at: string;
    video_url: string;
}

export interface Metadata {
    duration: number;
    filename: string;
    height: number;
    width: number;
}

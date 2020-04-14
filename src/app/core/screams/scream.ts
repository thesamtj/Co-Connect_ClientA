export interface Scream {
    screamId: string,
    body: string,
    userHandle: string,
    createdAt: string,
    commentCount: number,
    likeCount: number,
    userImage: string,
    comments?: any[]
}
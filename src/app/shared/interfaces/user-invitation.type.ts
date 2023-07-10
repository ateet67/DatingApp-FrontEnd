export interface UserInvitation {
    isActive: boolean,
    isAccepted: boolean,
    invited_by: number,
    invited_to: number,
    updated_by: number,
    createdAt: Date
}

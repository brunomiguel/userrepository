import MisskeyEntity from './entity';
declare namespace MisskeyNotificationType {
    const Follow: MisskeyEntity.NotificationType;
    const Mention: MisskeyEntity.NotificationType;
    const Reply: MisskeyEntity.NotificationType;
    const Renote: MisskeyEntity.NotificationType;
    const Quote: MisskeyEntity.NotificationType;
    const Reaction: MisskeyEntity.NotificationType;
    const PollVote: MisskeyEntity.NotificationType;
    const ReceiveFollowRequest: MisskeyEntity.NotificationType;
    const FollowRequestAccepted: MisskeyEntity.NotificationType;
    const GroupInvited: MisskeyEntity.NotificationType;
}
export default MisskeyNotificationType;

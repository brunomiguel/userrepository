import Entity from './entity';
declare namespace NotificationType {
    const Follow: Entity.NotificationType;
    const Favourite: Entity.NotificationType;
    const Reblog: Entity.NotificationType;
    const Mention: Entity.NotificationType;
    const EmojiReaction: Entity.NotificationType;
    const FollowRequest: Entity.NotificationType;
    const Status: Entity.NotificationType;
    const PollVote: Entity.NotificationType;
    const PollExpired: Entity.NotificationType;
}
export default NotificationType;

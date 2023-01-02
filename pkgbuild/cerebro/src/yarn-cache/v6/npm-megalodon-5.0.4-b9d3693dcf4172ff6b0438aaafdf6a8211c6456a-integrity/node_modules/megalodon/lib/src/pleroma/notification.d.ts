import PleromaEntity from './entity';
declare namespace PleromaNotificationType {
    const Mention: PleromaEntity.NotificationType;
    const Reblog: PleromaEntity.NotificationType;
    const Favourite: PleromaEntity.NotificationType;
    const Follow: PleromaEntity.NotificationType;
    const Poll: PleromaEntity.NotificationType;
    const PleromaEmojiReaction: PleromaEntity.NotificationType;
    const FollowRequest: PleromaEntity.NotificationType;
}
export default PleromaNotificationType;

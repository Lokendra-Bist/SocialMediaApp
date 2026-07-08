package we.link.service;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import we.link.entity.Notification;
import we.link.entity.NotificationType;
import we.link.entity.Posts;
import we.link.entity.Users;
import we.link.mapper.NotificationMapper;
import we.link.repository.INotificationRepo;
import we.link.response.NotificationResponse;

@Service
@RequiredArgsConstructor
public class NotificationMgmtServiceImpl implements INotificationMgmtService {
	
	private final INotificationRepo notificationRepo;
	
	private final SimpMessagingTemplate messagingTemplate;

	@Override
	public void sendLikeNotification(Users sender, Posts post) {
		Users receiver = post.getUser();

		if(sender.getId().equals(receiver.getId())) return;

		Notification savedNotification = notificationRepo.save(
											Notification.builder()
												.sender(sender)
												.receiver(receiver)
												.post(post)
												.type(NotificationType.LIKE)
												.build()
											);
		
		messagingTemplate.convertAndSendToUser(
									receiver.getEmail(),
									"/queue/notifications",
									NotificationMapper.toResponse(savedNotification)
								);
		
		System.out.println("Notification send from service notifi");
	}

	@Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getMyNotifications(Users receiver) {
        return notificationRepo.findByReceiverOrderByCreatedAtDesc(receiver)
					                .stream()
					                .map(NotificationMapper::toResponse)
					                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Long getUnreadCount(Users receiver) {
        return notificationRepo.countByReceiverAndIsReadFalse(receiver);
    }

    @Override
    public void markAllAsRead(Users receiver) {
        List<Notification> notifications = notificationRepo
        										.findByReceiverOrderByCreatedAtDesc(receiver);

        notifications.forEach(n -> n.setIsRead(false));

        notificationRepo.saveAll(notifications);
    }

}

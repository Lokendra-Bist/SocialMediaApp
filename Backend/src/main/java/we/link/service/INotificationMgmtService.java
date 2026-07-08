package we.link.service;

import java.util.List;

import we.link.entity.Posts;
import we.link.entity.Users;
import we.link.response.NotificationResponse;

public interface INotificationMgmtService {
	
	void sendLikeNotification(Users sender, Posts post);

    List<NotificationResponse> getMyNotifications(Users receiver);

    Long getUnreadCount(Users receiver);

    void markAllAsRead(Users receiver);
	
}

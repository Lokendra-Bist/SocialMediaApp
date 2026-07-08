package we.link.mapper;

import we.link.entity.Notification;
import we.link.response.NotificationResponse;

public class NotificationMapper {
	
	public static NotificationResponse toResponse(Notification notification) {
		return new NotificationResponse(
					notification.getId(),
					notification.getSender().getId(),
					notification.getSender().getFirstName() + " " +
							notification.getSender().getLastName(),
					notification.getSender().getUserProfile() != null
							? notification.getSender().getUserProfile().getProfileImageUrl()
							: null,
					notification.getPost().getId(),
					notification.getType(),
					notification.getIsRead(),
					notification.getCreatedAt()
				);
	}

}

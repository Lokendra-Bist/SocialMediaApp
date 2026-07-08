package we.link.config;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
public class WebSocketEventListener {

    @EventListener
    public void handleConnected(SessionConnectedEvent event) {
        System.out.println("CONNECTED: " + event.getUser());
    }

    @EventListener
    public void handleSubscribe(SessionSubscribeEvent event) {
        System.out.println("SUBSCRIBED: " + event.getUser());
    }
}
package we.link.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements IEmailMgmtService {
	
	private final JavaMailSender mailSender;

	@Override
	public void OtpSender(String email, String otp) {
		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(email);
		msg.setSubject("WeLink Email Verification");
		msg.setText("""
					Welcome to WeLink!
					Your verification code is: %s
					This code expires in 5 minutes.
				""".formatted(otp));
		mailSender.send(msg);
	}

}

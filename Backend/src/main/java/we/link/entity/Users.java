package we.link.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Users {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "first_name", nullable = false, length = 15)
	private String firstName;
	
	@Column(name = "middle_name", nullable = true, length = 10)
	private String middleName;
	
	@Column(name = "last_name", nullable = false, length = 15)
	private String lastName;

    @Column(nullable = false, unique = true)
	private String email;
	
    @Column(nullable = false)
	private String password;
	
    @Column(length = 150)
	private String bio;
	
	@Column(name = "profile_image")
	private String profileImage;
	
	@Column(name = "cover_image")
	private String coverImage;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;
	
	@Column(name = "created_at", nullable = false, updatable = false)
	private LocalDateTime createdAt;
	
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;

}

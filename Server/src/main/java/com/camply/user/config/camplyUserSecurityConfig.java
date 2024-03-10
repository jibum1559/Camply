package com.camply.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientManager;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProvider;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientProviderBuilder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class camplyUserSecurityConfig {

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT","PATCH"));
		configuration.setAllowedHeaders(Arrays.asList("X-Requested-With", "Origins", "Content-Type", "Accept", "Authorization"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.cors(cors -> {})
				.csrf(csrf -> csrf.disable())

				.authorizeHttpRequests(authorizeRequests ->
						authorizeRequests
								.requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
				)
				.oauth2Login(oauth2Login ->
						oauth2Login
								.successHandler((request, response, authentication) -> {
									if (authentication != null && authentication instanceof OAuth2AuthenticationToken) {
										OAuth2AuthenticationToken oauth2Authentication = (OAuth2AuthenticationToken) authentication;
										OAuth2User oauth2User = oauth2Authentication.getPrincipal();

										if (oauth2User != null) {
											String account_email = oauth2User.getAttribute("account_email");
											String profileNickname = oauth2User.getAttribute("profile_nickname");
											String name = oauth2User.getAttribute("name");

											response.sendRedirect("/");
										} else {
										}
									} else {
									}
								})
				)
				.formLogin(formLogin ->
						formLogin
								.loginPage("/login")
								.usernameParameter("USER_EMAIL")
								.passwordParameter("USER_PASSWORD")
								.defaultSuccessUrl("/")
								.failureUrl("/login")
				)
				.logout(logout ->
						logout
								.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
								.logoutSuccessUrl("/login")
								.invalidateHttpSession(true)

				)
				.anonymous(anonymous -> anonymous
						.authorities("ROLE_ANONYMOUS")

				);

		return http.build();
	}

	@Bean
	static AuthenticationManager authenticationManage(AuthenticationConfiguration a) throws Exception {
		return a.getAuthenticationManager();
	}

	@Bean
	static PasswordEncoder passwordEncoder() {

		return new BCryptPasswordEncoder();
	}

	@Bean
	public OAuth2AuthorizedClientManager authorizedClientManager(
			ClientRegistrationRepository clientRegistrationRepository,
			OAuth2AuthorizedClientRepository authorizedClientRepository) {
		// 클라이언트 인증 처리 설정
		OAuth2AuthorizedClientProvider authorizedClientProvider =
				OAuth2AuthorizedClientProviderBuilder.builder()
						.authorizationCode()
						.build();
		// 클라이언트 등록 정보와 인증된 클라이언트 저장소를 설정하여 OAuth2AuthorizedClientManager를 생성
		DefaultOAuth2AuthorizedClientManager authorizedClientManager =
				new DefaultOAuth2AuthorizedClientManager(
						clientRegistrationRepository, authorizedClientRepository);
		authorizedClientManager.setAuthorizedClientProvider(authorizedClientProvider);
		return authorizedClientManager;
	}

	@Bean
	public ClientRegistrationRepository clientRegistrationRepository() {
		return new InMemoryClientRegistrationRepository(
				naverClientRegistration(),
				kakaoClientRegistration()
		);
	}

	//네이버 클라이언트의 등록 정보를 생성하는 메서드
	//클라이언트 아이디와 시크릿, 인증 후 리다이렉트 URI 설정
	public ClientRegistration naverClientRegistration() {
		return ClientRegistration.withRegistrationId("naver")
//					.clientId("https://developers.naver.com/apps/#/myapps 안에 적혀있는 Client ID 가지고오기")
				.clientId("HQHp_3R0uDH7Ey5eoKgv")
				//.clientSecret("https://developers.naver.com/apps/#/myapps 안에 적혀있는 Client Secret 가지고오기")
				.clientSecret("QF6InKq5rO")
				//네이버에서 인증하고나서 OAuth2 엔드포인트 설정
				.redirectUri("http://localhost:8080/login/oauth2/code/naver")
				.clientName("Naver")
				.authorizationUri("https://nid.naver.com/oauth2.0/authorize")
				.tokenUri("https://nid.naver.com/oauth2.0/token")
				.userInfoUri("https://openapi.naver.com/v1/nid/me")
				.userNameAttributeName("response")
				.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
				.build();
	}

	// 카카오
	public ClientRegistration kakaoClientRegistration() {
		return ClientRegistration.withRegistrationId("kakao")
				.clientId("cfc1a70784e87ec9b6cd4654f31990d2")
				.clientSecret("k8XO2jG62S2alyjciSZsVQvmQHHIzVwG")
				.redirectUri("http://localhost:8080/getKakaoUserData")
				.clientName("Kakao")
				.authorizationUri("https://kauth.kakao.com/oauth/authorize")
				.tokenUri("https://kauth.kakao.com/oauth/token")
				.userInfoUri("https://kapi.kakao.com/v2/user/me")
				.userNameAttributeName("id")
				.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
				.scope("account_email", "profile_nickname", "name")
				.build();
	}
}

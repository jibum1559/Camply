package com.camply.shop.mypage.admin.ordermanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.common.vo.OrderVO;
import com.camply.shop.common.vo.ProductVO;
import com.camply.shop.mypage.admin.ordermanagement.service.OrderManagementService;
import com.camply.user.security.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/shop/mypage")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true", allowedHeaders="*")
public class OrderManagementController {
	@Autowired
	private OrderManagementService orderManagementService;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	//주문 리스트 조회
	@GetMapping("/orderList")
	public ResponseEntity<List<OrderVO>> getOrderList(HttpServletRequest request) {
		// 요청 헤더에서 토큰 추출
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 문자열 제거
            Long userId = jwtTokenProvider.getUserIdFromToken(token); // 토큰에서 사용자 ID 추출

            // user_id를 기준으로 등록한 상품 조회
            List<OrderVO> orderList = orderManagementService.getOrderList(userId);
            return ResponseEntity.ok(orderList);
        } else {
            // 토큰이 없거나 Bearer 토큰 형식이 아닌 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

	//주문조회 중 상품명, 주문자명, 주문번호로 검색
	@GetMapping("/search/orders")
	public ResponseEntity<List<OrderVO>> searchOrders(HttpServletRequest request, @RequestParam("searchType") String searchType, @RequestParam("searchTerm") String searchTerm) {
	    String token = request.getHeader("Authorization");
	    if (token != null && token.startsWith("Bearer ")) {
	        token = token.substring(7);
	        Long userId = jwtTokenProvider.getUserIdFromToken(token);

	        List<OrderVO> orders;
	        if ("productName".equals(searchType)) {
	            orders = orderManagementService.getOrdersBySellerAndProductName(userId, searchTerm);
	        } else if ("orderOrdererName".equals(searchType)) {
	            orders = orderManagementService.selectOrdersBySellerAndOrderName(userId, searchTerm);
	        } else if ("orderNo".equals(searchType)) {
	        	int orderNoInt = Integer.parseInt(searchTerm); // String을 int로 변환
                orders = orderManagementService.selectOrderByOrderNo(userId, orderNoInt);
	        } else {
	            // 처리할 수 없는 검색 유형의 경우
	            return ResponseEntity.badRequest().build();
	        }
	        
	        return ResponseEntity.ok(orders);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}
}
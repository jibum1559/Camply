package com.camply.shop.mypage.admin.productmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.common.vo.ProductVO;
import com.camply.shop.mypage.admin.productmanagement.service.ProductManagementService;
import com.camply.user.security.JwtTokenProvider;
import com.camply.user.vo.UserVO;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/shop/mypage")
@CrossOrigin(origins="http://localhost:3000", allowCredentials="true", allowedHeaders="*")
public class ProductManagementController {
	@Autowired
	private ProductManagementService productManagementService;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	//상품 등록
	@PostMapping("/productAdd")
    public ResponseEntity<?> insertProduct(@RequestBody ProductVO shopProduct, HttpServletRequest request) {
		try {
            String token = request.getHeader("Authorization");
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7); // "Bearer " 문자열 제거
                Long userId = jwtTokenProvider.getUserIdFromToken(token); // 토큰에서 사용자 ID 추출
                
                // 사용자 ID를 ProductVO에 설정하고 서비스 메소드 호출
                shopProduct.setUserId(userId);
                productManagementService.insertProduct(shopProduct, userId); // 서비스 호출 시 userId 추가
                
                return ResponseEntity.status(HttpStatus.CREATED).body(shopProduct);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
	}
	@GetMapping("/getUserProductCount")
	public ResponseEntity<?> getUserProductCount(HttpServletRequest request) {
	    String token = request.getHeader("Authorization");
	    if (token != null && token.startsWith("Bearer ")) {
	        try {
	            token = token.substring(7); // "Bearer " 제거
	            Long userId = jwtTokenProvider.getUserIdFromToken(token); // 토큰에서 사용자 ID 추출

	            int productCount = productManagementService.getUserProductCount(userId);
	            return ResponseEntity.ok(productCount); // 사용자별 등록된 상품 수 반환
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving product count");
	        }
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}

	// 등록 상품 리스트 조회
	@GetMapping("/productList")
    public ResponseEntity<List<ProductVO>> getAllProductsByUserId(HttpServletRequest request) {
        // 요청 헤더에서 토큰 추출
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // "Bearer " 문자열 제거
            Long userId = jwtTokenProvider.getUserIdFromToken(token); // 토큰에서 사용자 ID 추출

            // user_id를 기준으로 등록한 상품 조회
            List<ProductVO> products = productManagementService.getAllProductsByUserId(userId);
            return ResponseEntity.ok(products);
        } else {
            // 토큰이 없거나 Bearer 토큰 형식이 아닌 경우
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
	//등록 상품 단일 조회
	@GetMapping("/product/{productId}")
	public ResponseEntity<ProductVO> getProductById(@PathVariable Long productId, HttpServletRequest request) {
	    // 토큰에서 판매자의 userId 추출
	    String token = request.getHeader("Authorization");
	    if (token != null && token.startsWith("Bearer ")) {
	        token = token.substring(7); // "Bearer " 문자열 제거
	        Long userId = jwtTokenProvider.getUserIdFromToken(token);

	        // 판매자의 userId를 사용하여 해당 상품 조회
	        ProductVO product = productManagementService.getProductById(productId, userId);
	        if(product != null) {
	            return ResponseEntity.ok(product);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    } else {
	        // 토큰이 없거나 Bearer 토큰 형식이 아닌 경우
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}

   
	//등록 상품 수정
	//판매자의 userId를 토큰에서 추출하여 사용하여 getProductById 호출
	@PutMapping("/product/edit/{productId}")
	public ResponseEntity<ProductVO> updateProduct(@PathVariable Long productId, @RequestBody ProductVO productVO, HttpServletRequest request) {
	    // 토큰에서 판매자의 userId 추출
	    String token = request.getHeader("Authorization");
	    if (token != null && token.startsWith("Bearer ")) {
	        token = token.substring(7); // "Bearer " 문자열 제거
	        Long userId = jwtTokenProvider.getUserIdFromToken(token);

	        // 판매자의 userId를 사용하여 해당 상품 수정
	        productVO.setProductId(productId); // 받아온 productId를 객체에 설정
	        productManagementService.updateProduct(productVO, userId);
	        return ResponseEntity.ok().build();
	    } else {
	        // 토큰이 없거나 Bearer 토큰 형식이 아닌 경우
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}
	
	//등록 상품 상태 수정
	//판매자의 userId를 토큰에서 추출하여 사용하여 updateProduct 호출
		@PutMapping("/product/statusEdit/{productId}")
		public ResponseEntity<?> statusUpdateProduct(@PathVariable Long productId, @RequestBody ProductVO product, HttpServletRequest request) {
		    // 토큰에서 판매자의 userId 추출
		    String token = request.getHeader("Authorization");
		    if (token != null && token.startsWith("Bearer ")) {
		        token = token.substring(7); // "Bearer " 문자열 제거
		        Long userId = jwtTokenProvider.getUserIdFromToken(token);

		        // 판매자의 userId를 사용하여 해당 상품 상태 수정
		        ProductVO existingProduct = productManagementService.getProductById(productId, userId);
		        if(existingProduct != null) {
		            productManagementService.statusUpdateProduct(productId, product.getProductStatus(), userId);
		            return ResponseEntity.ok().build();
		        } else {
		            return ResponseEntity.notFound().build();
		        }
		    } else {
		        // 토큰이 없거나 Bearer 토큰 형식이 아닌 경우
		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		    }
		}
   

	//등록 상품 삭제
	//판매자의 userId를 토큰에서 추출하여 사용하여 deleteProduct 호출
	@DeleteMapping("/productDelete/{productId}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long productId, HttpServletRequest request) {
	    // 토큰에서 판매자의 userId 추출
	    String token = request.getHeader("Authorization");
	    if (token != null && token.startsWith("Bearer ")) {
	        token = token.substring(7); // "Bearer " 문자열 제거
	        Long userId = jwtTokenProvider.getUserIdFromToken(token);

	        // 판매자의 userId를 사용하여 해당 상품 삭제
	        productManagementService.deleteProduct(productId, userId);
	        return ResponseEntity.ok().build();
	    } else {
	        // 토큰이 없거나 Bearer 토큰 형식이 아닌 경우
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
	}
}




//기존 product_id 기준 등록 상품 리스트 조회
/*
@GetMapping("/productList")

public ResponseEntity<List<ProductVO>> getAllProductsByUserId() {
	try {
		List<ProductVO> productList = productManagementService.getAllProductsByUserId();
		System.out.println("product : " + productList);
		return ResponseEntity.ok(productList);
		
	}catch(Exception e) {
		e.printStackTrace();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
}
*/
//user_id 예외처리문 없는 등록 상품 리스트 조회
	/*
 @GetMapping("/productList")
 public ResponseEntity<List<ProductVO>> getAllProducts(HttpServletRequest request) {
     String token = request.getHeader("Authorization").substring("Bearer ".length());
     Long userId = jwtTokenProvider.getUserIdFromToken(token); // 토큰에서 사용자 ID 추출
     List<ProductVO> productList = productManagementService.getAllProductsByUserId(userId);
     return ResponseEntity.ok(productList);
 }
 */
/*
//등록 상품 단일 조회
	@GetMapping("/product/{productId}")
	public ResponseEntity<ProductVO> getProductById(@PathVariable Long productId) {
	    ProductVO product = productManagementService.getProductById(productId);
	    if(product != null) {
	        return ResponseEntity.ok(product);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	}

 
	//등록 상품 수정
	@PutMapping("/product/edit/{productId}")
	public ResponseEntity<ProductVO> updateProduct(@PathVariable Long productId, @RequestBody ProductVO productVO) {
		productVO.setProductId(productId); // 받아온 productId를 shopProduct 객체에 설정
		productManagementService.updateProduct(productVO);
	    return ResponseEntity.ok().build();
	}
	
	//등록 상품 상태 수정
		@PutMapping("/product/statusEdit/{productId}")
		public ResponseEntity<?> statusUpdateProduct(@PathVariable Long productId, @RequestBody ProductVO product) {
		    ProductVO existingProduct = productManagementService.getProductById(productId);
		    if(existingProduct != null) {
		        productManagementService.statusUpdateProduct(productId, product.getProductStatus());
		        return ResponseEntity.ok().build(); // 업데이트 된 상품의 상태를 응답으로 보내지 않음
		    } else {
		        return ResponseEntity.notFound().build();
		    }
		}
 

	//등록 상품 삭제
	@DeleteMapping("/productDelete/{productId}")
	public ResponseEntity<?> deleteProduct	(@PathVariable int productId) {
		productManagementService.deleteProduct(productId);
		return ResponseEntity.ok().build();
	}
*/
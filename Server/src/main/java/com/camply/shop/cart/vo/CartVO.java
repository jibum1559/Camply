package com.camply.shop.cart.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartVO {
	private int cartId;
	private int productId;
	private Long userId;
	private String productThumbnail;
	private String productName;
	private int productPrice;
	private int productAmount;

}

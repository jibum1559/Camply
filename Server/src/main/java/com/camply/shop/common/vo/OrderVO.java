package com.camply.shop.common.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.text.NumberFormat;
/*
ORDER_ID
USER_ID
ORDER_ORDERER_NAME
ORDER_ORDERER_EMAIL
ORDER_ORDERER_PHONE
ORDER_RECEIVER_NAME
ORDER_RECEIVER_ADDRESS
ORDER_RECEIVER_ADDRESSDETAILL
ORDER_RECEIVER_PHONE
ORDER_RECEIVER_MESSAGE
ORDER_RECEIVER_DELIVERY_MESSAGE
ORDER_PRODUCT_IMG
ORDER_PRODUCT_NAME
ORDER_PRODUCT_AMOUNT
ORDER_PRODCUT_QUANTITY
ORDER_DATE
ORDER_PRODUCT_PRICE
ORDER_STATUS
PRODUCT_ID
 */
import java.time.LocalDateTime;
import java.util.Locale;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderVO {
	private int orderNo;
	private Long userId;
	private String orderOrdererName;
	private String orderOrderEmail;
	private String orderOrderPhone;
	private String orderReceiverName;
	private String orderReceiverAddress;
	private String orderReceiverAddressDetail;
	private String orderReceiverPhone;
	private String orderReceiverMessage;
	private String orderReceiverDeleveryMsg;
	private String productThumbnail;
	private String productName;
	private int orderProductAmount;
	private LocalDateTime orderDate;
	private int productPrice;
	private String orderStatus;
	private int productId;
	private int totalPrice;
	
	private ProductVO product;

}
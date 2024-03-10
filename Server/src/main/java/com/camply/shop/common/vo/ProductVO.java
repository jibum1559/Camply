package com.camply.shop.common.vo;

import java.sql.Date;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.util.Locale;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
PRODUCT_ID	NUMBER
PRODUCT_NAME	VARCHAR2(255 BYTE)
PRODUCT_DESCRIPTION	VARCHAR2(255 BYTE)
PRODUCT_PRICE	NUMBER
PRODUCT_CATEGORY	VARCHAR2(50 BYTE)
PRODUCT_COLOR	VARCHAR2(255 BYTE)
PRODUCT_THUMBNAIL	VARCHAR2(255 BYTE)
PRODUCT_MAIN	VARCHAR2(255 BYTE)
PRODUCT_MAIN2	VARCHAR2(255 BYTE)
PRODUCT_MAIN3	VARCHAR2(255 BYTE)
PRODUCT_CONTENT	VARCHAR2(255 BYTE)
PRODUCT_CREATE_DATE	TIMESTAMP(6)
PRODUCT_STOCK	NUMBER
USER_ID	NUMBER
PRODUCT_STATUS	VARCHAR2(20 BYTE)
PRODUCT_CODE	NUMBER
*/

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductVO {
	
	private Long productId;
	private String productName;
	private String productDescription;
	private int productPrice;
	private String productCategory;
	private String productColor;
	private String productThumbnail;
	private String productMain;
	private String productMain2;
	private String productMain3;
	private String productContent;
	private int productStock;
	private LocalDate productCreateDate;
	private Long userId;
	private String productStatus;
	private String productCode;
	
	
	public String getFormattedProductPrice() {
        return NumberFormat.getNumberInstance(Locale.KOREA).format(this.productPrice) + "원";
	}
}

package com.portal.common.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName: WebUtils 
 * @Description: Web工具类
 * @author Xia ZhengWei
 * @date 2016年8月29日 下午11:11:55 
 */
public class WebUtils {
	
	/**
	 * @Title: getBasePath 
	 * @Description: 获得基础路径
	 * @param request
	 * @param response
	 * @return String
	 * @throws
	 */
	public static String getBasePath(HttpServletRequest request,
	                                 HttpServletResponse response) {
		String scheme = request.getScheme()+"://";
		String requestURL = request.getRequestURL().toString();
		requestURL = requestURL.substring(scheme.length());
		int last = requestURL.indexOf("/");
		if(last==-1){
			last=requestURL.length();
		}
		requestURL = requestURL.substring(0,last);
		String basePath = scheme+requestURL+request.getContextPath()+"/";
		return basePath;
	}

	/**
	 * @Title: getRequestMappingName 
	 * @Description: 获取请求中的映射名
	 * @param request
	 * @param response
	 * @return String
	 * @throws
	 */
	public static String getRequestMappingName(HttpServletRequest request,
	                                           HttpServletResponse response){
		String basePath = getBasePath(request,response);
		String str = request.getRequestURL().toString().substring(basePath.length());
		return str;
	}
	
	/**
	 * @Title: getRequestMappingNameAndParm 
	 * @Description: 获取请求中的映射名和参数
	 * @param request
	 * @param response
	 * @return String
	 * @throws
	 */
	public static String getRequestMappingNameAndParm(HttpServletRequest request, 
													  HttpServletResponse response){
		String basePath = getBasePath(request,response);
		String str = request.toString().substring(basePath.length());
		String parms = request.getQueryString();
		if(parms!=null){
			str = str+"?"+parms;
		}
		return str;
	}
	
	/**
	 * @Title: setAttributeToRequest 
	 * @Description: 将URL地址中的活动导航标识保存到Session中
	 * @param request 
	 * @return void
	 * @author Xia ZhengWei
	 * @date 2016年10月27日 下午11:45:54 
	 * @version V1.0
	 */
	public static void setAttributeToSession(HttpServletRequest request) {
	    // 获取URL地址中的活动导航标识
	    String active = request.getParameter("active");
	    if(StringUtil.isNotBlank(active)) {
	        // 将活动导航标识保存到Session中
	        request.getSession().setAttribute("active", Integer.parseInt(active));
	    }
	}
	
	
}

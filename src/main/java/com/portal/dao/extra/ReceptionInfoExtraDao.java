package com.portal.dao.extra;

import com.portal.bean.Criteria;
import com.portal.bean.result.ReceptionInfoForm;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceptionInfoExtraDao {

    int countByExample(Criteria example);

    /**
     * 根据条件查询记录集
     */
    List<ReceptionInfoForm> selectByExample(Criteria example);

    /**
     * 通过客户ID查询客户的拜访记录
     * by meng.yue
     * @param customerId
     * @return
     */
    List<ReceptionInfoForm> queryRecordListbyId(String customerId);

    /**
     * 查询未完成的拜访记录
     * by meng.yue
     * @return
     */
    ReceptionInfoForm queryRecordBeginbyId(String customerId);

    /**
     * @Title: countByCondition 
     * @Description: 根据条件获取登门出单统计总条数
     * @param criteria 公共查询条件类
     * @return int
     * @author Xia ZhengWei
     * @date 2016年10月17日 下午9:03:26 
     * @version V1.0
     */
    int countByCondition(Criteria criteria);

    /**
     * @Title: selectByCondition 
     * @Description: 根据条件获取登门出单统计数据
     * @param criteria 公共查询条件类
     * @return List<ReceptionInfoForm>
     * @author Xia ZhengWei
     * @date 2016年10月17日 下午9:04:46 
     * @version V1.0
     */
    List<ReceptionInfoForm> selectByCondition(Criteria criteria);

    /**
     * @Title: getOrderDetailCounts 
     * @Description: 根据条件获取登门出单详细数据总条数
     * @param criteria
     * @return int
     * @author Xia ZhengWei
     * @date 2016年10月17日 下午11:57:02 
     * @version V1.0
     */
    int getOrderDetailCounts(Criteria criteria);

    /**
     * @Title: getOrderDetailsByCondition 
     * @Description: 根据条件获取登门出单详细数据
     * @param criteria
     * @return List<ReceptionInfoForm>
     * @author Xia ZhengWei
     * @date 2016年10月17日 下午11:57:29 
     * @version V1.0
     */
    List<ReceptionInfoForm> getOrderDetailsByCondition(Criteria criteria);

    /**
     * 在结束接待的时候修改接待时间
     * @param criteria
     * @return
     */
    int updateById4Quit(Criteria criteria);

    /**
     * 更新订单表中的orderID
     * @param criteria
     * @return
     */
    int updateOrderId(Criteria criteria);

    /**
     * 更新订单中的presentID 和 presentName 
     * @param criteria
     * @return
     */
    int updatePresentOrderId(Criteria criteria);

    /**
     * @Title: getByConditions 
     * @Description: 定时器获取每日接待信息
     * @param example
     * @return List<String>
     * @author Xia ZhengWei
     * @date 2017年1月19日 下午10:41:49 
     * @version V1.0
     */
    List<String> getByConditions(Criteria example);
}

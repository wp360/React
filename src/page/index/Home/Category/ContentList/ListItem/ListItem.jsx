import React from 'react';
import './ListItem.scss';
import {connect} from 'react-redux';
/**
 * @constructor <ListItem />
 * @description 列表单个组件
 */

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * 渲染是否新到和品牌标签
   * @param {*} data
   */
  renderBrand(data) {
    if (data.brand_type) {
      return <div className="brand brand-pin">品牌</div>
    } else {
      return <div className="brand brand-xin">新到</div>
    }
  }

  /**
   * 渲染五颗星得分方法
   * @param {*} data
   */
  renderScore(data) {
    let wm_poi_score = data.wm_poi_score || '';
    let score = wm_poi_score.toString();
    let scoreArray = score.split('.');
    // 满星个数
    let fullstar = parseInt(scoreArray[0]);
    // 半星个数
    let halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;
    // 零星个数
    let nullstar = 5 - fullstar - halfstar;

    let starjsx = [];
    // 渲染满星jsx
    for (let i = 0; i < fullstar; i++) {
      starjsx.push(
        <div key={i + 'full'} className="star fullstar"></div>
      )
    }
    // 渲染半星jsx
    if (halfstar) {
      for (let j = 0; j < halfstar; j++) {
        starjsx.push(
          <div key={j + 'half'} className="star halfstar"></div>
        )
      }
    }
    // 渲染零星jsx
    if (nullstar) {
      for (let k = 0; k < nullstar; k++) {
        starjsx.push(
          <div key={k + 'null'} className="star nullstar"></div>
        )
      }
    }
    return starjsx;
  }

  /**
   * 渲染月售数量
   * @param {*} data
   */
  renderMonthNum(data) {
    let num = data.month_sale_num;
    // 大于999采用999+
    if(num>999) {
      return '999+';
    }
    return num;
  }

  /**
   * 是否需要渲染美团专送tag
   * @param {*} data
   */
  renderMeituanFlag(data) {
    if(data.delivery_type) {
      return (
        <div className="item-meituan-flag">美团专送</div>
      )
    }
    return null;
  }

  /**
   * 渲染商家活动
   * @param {*} data
   */
  renderOthers(data) {
    let array = data.discounts2;
    return array.map((item,index) => {
      return (
        <div className="other-info" key={index}>
          <img className="other-tag" src={item.icon_url} />
          <div className="other-content">{item.info}</div>
        </div>
      )
    });
  }

  render() {
    let data = this.props.itemData;
    return (
      <div className="r-item-content scale-1px">
        <img className="item-img" src={data.pic_url}/> {this.renderBrand(data)}
        <div className="item-info-content">
          <p className="item-title">{data.name}</p>
          <div className="item-desc clearfix">
            <div className="item-score">{this.renderScore(data)}</div>
            <div className="item-count">月售{this.renderMonthNum(data)}</div>
            <div className="item-distance">&nbsp;{data.distance}</div>
            <div className="item-time">{data.mt_delivery_time}&nbsp;|</div>
          </div>
          <div className="item-price">
            <div className="item-pre-price">{data.min_price_tip}</div>
            {this.renderMeituanFlag(data)}
          </div>
          <div className="item-others">
            {this.renderOthers(data)}
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(ListItem);
import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components'
import classNames from 'classnames';
import styles from './index.module.scss'

const Index = memo(() => {

  const dispatch = useDispatch();
  const { indexData } = useSelector((state) => {
    return { indexData: state?.index?.indexData }
  }, shallowEqual);

  return (
    <View className={classNames('page', styles.page)}>
      <Text>Hello world!</Text>
      <View>{indexData}</View>
      <Button onClick={() => {
        dispatch({
          type: 'index/getIndexData',
          payload: {
            num: 2,
          }
        });
      }}>add index 2</Button>

      <Button onClick={()=> {
        Taro.navigateTo({
          url: '/pages/my/index/index'
        });
      }}>to MyIndex</Button>
    </View>
  )
});

export default Index;

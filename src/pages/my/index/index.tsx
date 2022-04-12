import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { View, Text, Button } from '@tarojs/components'
import classNames from 'classnames';
import dva from '@/utils/dva';

import model from './model';
import styles from './index.module.scss';

dva.registerModel(model);

const MyIndex = memo(() => {

  const dispatch = useDispatch();
  const { indexData } = useSelector((state) => {
    return { indexData: state?.myIndex?.indexData }
  }, shallowEqual);

  return (
    <View className={classNames('page', styles.page)}>
      <Text>myIndex!</Text>
      <View>{indexData}</View>
      <Button onClick={() => {
        dispatch({
          type: 'myIndex/getIndexData',
          payload: {
            num: 2,
          }
        });
      }}>current add 2</Button>
      <Button onClick={() => {
        dispatch({
          type: 'index/getIndexData',
          payload: {
            num: 2,
          }
        });
      }}>index add 2</Button>

    </View>
  )
});

export default MyIndex;

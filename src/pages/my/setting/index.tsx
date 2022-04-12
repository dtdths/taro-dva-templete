import React, { memo } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames';
import styles from './index.module.scss'

const Detail = memo(() => {

  return (
    <View className={classNames('page', styles.page)}>
      <Text>my-setting</Text>
    </View>
  )
});

export default Detail;

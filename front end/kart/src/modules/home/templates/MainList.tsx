import { View, Text, FlatList, NativeSyntheticEvent, NativeScrollEvent, RefreshControl, Platform, ActivityIndicator, } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { dynamicDashboardData as fullData} from '@utils/db'
import AdCarousal from '../organisms/AdCarousal'
import categories from '../organisms/categories'



const sectionComponents: {[key:string]:React.ComponentType<any>}={
    ad_carousal:AdCarousal,
    categories:categories
}
const PAGE_SIZE=4

const MainList:FC<{scrollYGlobal:any}> = ({scrollYGlobal}) => {
const [isRefreshing,setIsRefreshing] = useState(false);
const [data,setData] = useState(fullData.slice(0,PAGE_SIZE));
const [currentPage,setCurrentPage] = useState(1);
const [isLoadingMore, setIsLoadingMore] = useState(false);

const prevScrollY = useRef(0);
const flatlistRef = useRef<FlatList>(null)

const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>)=>{
    const currentScrollY =event?.nativeEvent?.contentOffset.y
    scrollYGlobal.value =currentScrollY;
    prevScrollY.current = currentScrollY; 
}

const handleRefresh = ()=>{
    setIsRefreshing(true);
    setTimeout(()=>{
        setCurrentPage(1)
        setData(fullData?.slice(0,PAGE_SIZE))
        setIsRefreshing(false)
    },3000)

}

const handleLoadMore = ()=>{
    if(isLoadingMore )return ;
    if(data?.length>=fullData?.length)return;

    setIsLoadingMore(true);
    setTimeout(()=>{
        const nextPage =currentPage+1;
        const newItem = fullData?.slice(0,nextPage*PAGE_SIZE)
        setData(newItem)
        setCurrentPage(nextPage);
        setIsLoadingMore(false)

    },4000)
}

const renderItem = ({item}: any)=>{
    const SectionComponent = sectionComponents[item?.type]
    return SectionComponent?<SectionComponent data={item}/>:null
}


  return (
    <FlatList
    data={data}
    refreshControl={
      <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
    }
    overScrollMode="always"
    onScroll={handleScroll}
    ref={flatlistRef}
    renderItem={renderItem}
    scrollEventThrottle={16}
    onEndReached={handleLoadMore}
    onEndReachedThreshold={0.5}
    nestedScrollEnabled
    contentContainerStyle={{
      paddingBottom: Platform.OS === 'android' ? 200 : 300,
    }}
    showsVerticalScrollIndicator={false}
    keyExtractor={(item, index) => index.toString()}
    ListFooterComponent={
      isLoadingMore ? (
        <ActivityIndicator
          size="small"
          color="#989"
          style={{ alignSelf: 'center', margin: 15 }}
        />
      ) : null
    }
  />
);
};

export default MainList;
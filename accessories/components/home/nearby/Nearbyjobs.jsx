import React  from 'react'
import { View, Text , TouchableOpacity , ActivityIndicator } from 'react-native'
import {useRouter} from 'expo-router';

import styles from './nearbyjobs.style'
import {COLORS, SIZES} from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

import useFetch from '../../../../hook/useFetch';

const Nearbyjobs = () => {

    const router = useRouter();

    const {data , error , IsLoading ,refetch} = useFetch('search' , {
      query : 'React developer',
      num_pages : 1 
    })

    // console.log(data);
  return (
    <View style = {styles.container}>
      {/*PopularJob's Header*/}
        <View style = {styles.header}>
          <Text style = {styles.headerTitle}>Nearby Jobs</Text>
        {/*  <TouchableOpacity>
            <Text style = {styles.headerBtn}>Show all</Text>
          </TouchableOpacity>*/}
        </View>

      {/*Cards*/}
        <View style = {styles.cardContainer}>
          {IsLoading ? (
            <ActivityIndicator size = 'large' colors = {COLORS.lightBlue}/>
            ) : error ? (
              <Text>Something went wrong</Text>
            ) : (
              data?.map((job) => (
                <NearbyJobCard 
                  job = {job}
                  key = {`nearby-job-${job?.job_id}`}
                  handleNavigate = {() => router.push(`/job-details/${job.job_id}`)}
                />
              ))
            )}
        </View>
    </View>
  )
}

export default Nearbyjobs
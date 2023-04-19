import React from 'react'
import { View, Text  , Image} from 'react-native'

import styles from './company.style'
import {checkImageUrl} from '../../../../utils';
import {icons} from '../../../constants';

const Company = ({companylogo , jobTitle , companyName , location}) => { 
  return ( 
    <View style = {styles.container}> 
      <View style = {styles.logoBox}>
        <Image 
          source = {{
            uri : checkImageUrl(companylogo) ? 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg' : companylogo
          }}

          style = {styles.logoImage}
        />
      </View> 

      <View style = {styles.jobTitleBox}>
        <Text style = {styles.jobTitle}>{jobTitle}</Text>
      </View>

      <View style = {styles.companyInfoBox}>
      {/*companyName*/}
        <Text style = {styles.companyName}>{companyName} / </Text>
      {/*Location*/}
        <View style = {styles.locationBox}>
          <Image source = {icons.location} resizeMode = 'contain' style = {styles.locationImage}/>
          <Text style = {styles.locationName}>{location}</Text>
        </View>
        
      </View>

    </View>
  ) 
}

export default Company
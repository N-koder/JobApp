import {useState} from 'react';
import {View , ScrollView , SafeAreaView , Text} from 'react-native';
import {Stack , useRouter} from 'expo-router';

import {COLORS , icons , images , SIZES} from '../accessories/constants';

import {Nearbyjobs , Popularjobs , ScreenHeaderBtn , Welcome} from '../accessories/components';


const Home = () => {
	const router = useRouter();
	const [searchTerm , setSearchTerm] = useState("")

	return(
		<SafeAreaView style= {{ flex : 1 , backgroundColor : COLORS.lightWhite}}>

		{/*Header*/}
			<Stack.Screen 
				options = {{
					headerStyle : {backgroundColor : COLORS.lightBlue},

					headerShadowVisible : false,

					headerTitle : "JOBS",

					headerLeft : () => (
						<ScreenHeaderBtn iconUrl = {icons.nothing} dimension = '60%'/>
					),

					headerRight : () => (
						<ScreenHeaderBtn iconUrl = {images.profile} dimension = '100%'/>
					),

				}}
			/>

		{/*Main*/}
			<ScrollView showsVerticleScrollIndicator = {false}>
				<View style = {{flex : 1 , padding: SIZES.medium}}>
					
					<Welcome 
						searchTerm = {searchTerm}
						setSearchTerm = {setSearchTerm}
						handleClick = {() => {
							if(searchTerm){
								router.push(`/search/${searchTerm}`)
							}
						}}
					/>
					<Popularjobs/>
					<Nearbyjobs/>
									
				</View>
			</ScrollView>

		</SafeAreaView>
	)
}

export default Home;
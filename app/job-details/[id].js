import {Text , View , ActivityIndicator , RefreshControl , ScrollView , SafeAreaView} from 'react-native';

import {Stack , useRouter , useSearchParams} from 'expo-router';
import { useCallback , useState} from 'react';

import {Company , JobAbout , JobFooter , JobTabs , ScreenHeaderBtn , Specifics} from '../../accessories/components'
import {COLORS , icons, SIZES} from '../../accessories/constants';
import useFetch from '../../hook/useFetch';

const tabs = ["About" , "Qualifications" , "Responsibilities"]

const JobDetails = () => {
	const params = useSearchParams();
	const router = useRouter();

	const [refreshing , setRefreshing] = useState(false);
	const onRefresh = useCallback(() => {
		setRefreshing(true);
		refetch();
		setRefreshing(false);
	} , [])

	const {data , IsLoading , error , refetch} = useFetch('job-details' , {job_id : params.id})

	const [activeTab, setActiveTab] = useState(tabs[0]);

	const displayTabContent = () => {
		switch(activeTab){
			case "About" :
				return <JobAbout
					info = {data[0].job_description ?? "No data provided"}
				/>
			case "Qualifications" :
				return <Specifics 
					title = "Qualifications"
					points = {data[0].job_highlights?.Qualifications ?? ['N/A']}
				/>
			case "Responsibilities" :
				return <Specifics 
					title = "Responsibilites"
					points = {data[0].job_highlights?.Responsibilities?? ['N/A']}
				/>
			default : 
				break;
		}
	}

	return (
		<SafeAreaView style = {{flex : 1 , backgroundColor:COLORS.lightWhite}}>
			<Stack.Screen
				options = {{
					headerStyle : {backgroundColor : COLORS.lightBlue},
					headerShadowVisible : false,
					headerBackVisible : false,
					headerTitle : '',
					headerLeft : () => (
						<ScreenHeaderBtn iconUrl = {icons.left} dimension = '60%' handlePress = {() => router.back()}/>
					),

					headerRight : () => (
						<ScreenHeaderBtn iconUrl = {icons.nothing} dimension = '60%' />
					)
				}}

			 / >
				
			<>
				<ScrollView showsVerticleScrollIndicator = {false} refreshControl = {<RefreshControl refreshing = {refreshing} onRefresh = {onRefresh} />}>
					{IsLoading ? (
						<ActivityIndicator size ='large' color = {COLORS.lightBlue} />
					) : error ? (
						<Text>Something went wrong </Text>
					) : data.length == 0 ? (
						<Text>No data</Text>
					) : (
						<View style = {{padding : SIZES.medium , paddingBottom : 100}}>

							<Company 
								companylogo = {data[0].employer_logo}
								jobTitle = {data[0].job_title}
								companyName  = {data[0].employer_name}
								location = {data[0].job_country}
							/>

							<JobTabs 
								tabs = {tabs}
								activeTab = {activeTab}
								setActiveTab = {setActiveTab}
							/>

							{displayTabContent()}

						</View>
					)}
				</ScrollView>

				<JobFooter url = {data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}/>
			</>
		</SafeAreaView>
	)
}

export default JobDetails

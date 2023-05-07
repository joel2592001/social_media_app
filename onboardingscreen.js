import Onboarding from 'react-native-onboarding-swiper';
import { Image,StatusBar } from 'react-native';

export default function Onboardingscreen({navigation}){
    return (
        <>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#FF3131" translucent = {true}/>
        <Onboarding
        onSkip={() => navigation.replace('Loginscreen')}
        onDone={() => navigation.replace('Loginscreen')}

        pages={[
            {
                backgroundColor: '#FF3131',
                image: <Image source={require('./assets/onboard1.png')} style={{height:200,width:200}}/>,
                title: 'Explore More',
                subtitle: 'New world New people',
            },
            {
                backgroundColor: '#FF3131',
                image: <Image source={require('./assets/onboard2.png')} style={{height:250,width:250}}/>,
                title: 'Connect Now',
                subtitle: 'Quality time with quality peoples',
            },
            {
                backgroundColor: '#FF3131',
                image: <Image source={require('./assets/onboard3.png')} style={{height:250,width:250}}/>,
                title: 'Enjoy Now',
                subtitle: 'User friendly experince',
            },
        ]}
        
        />
        </>
    )
}
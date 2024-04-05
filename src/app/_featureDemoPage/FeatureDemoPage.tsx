import HeroSection from '@/components/heroSection/heroSection';
import React  from 'react';

import ExampleContainer from '../demoPage/_exampleContainer/exampleContainer';
import UpdateInfo from './_updateInfo/UpdateInfo';

const FeatureDemoPage = () => {
  return (
    <>
        <HeroSection/>
        <UpdateInfo/>
        <ExampleContainer/>
    </>
  );
};

export default FeatureDemoPage;
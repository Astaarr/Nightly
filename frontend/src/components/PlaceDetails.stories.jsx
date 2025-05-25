// PlaceDetails.stories.jsx
import React from 'react';
import PlaceDetails from './PlaceDetails';

export default {
  title: 'Components/PlaceDetails',
  component: PlaceDetails,
};

const Template = (args) => <PlaceDetails {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Aquí podrías usar props si el componente las aceptara,
  // pero como PlaceDetails no recibe props, simplemente lo renderizamos.
};

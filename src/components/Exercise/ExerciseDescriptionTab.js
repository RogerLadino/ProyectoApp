import { Text, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '../../constant/theme';

const ExerciseDescriptionTab = ({ description }) => {
  return (
    <ScrollView style={styles.tabItem}>
      <Text style={styles.exerciseDescription}>{description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
  },
  exerciseDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    textAlign: 'justify',
  },
});

ExerciseDescriptionTab.propTypes = {
  description: PropTypes.string.isRequired,
};

export default ExerciseDescriptionTab;

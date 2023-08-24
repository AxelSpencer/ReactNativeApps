import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useFetchDays } from './useFetch';

interface ForecastItem {
    date: string;
    day: {
        condition: {
        icon: string;
        text: string;
        };
        maxtemp_f: number;
        mintemp_f: number;
    };
}

interface ForecastTabProps {
    route: { params: { days: number } };
}

const zipCode = '02861';

const getDayName = (dateString: string) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return daysOfWeek[date.getDay()];
};

const ForecastTab = ({ route }: ForecastTabProps) => {
    const { days } = route.params;
    const { data, loading, error } = useFetchDays(zipCode, days.toString());

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: ForecastItem }) => (
        <View style={styles.forecastItem}>
          <Text>{getDayName(item.date)}</Text>
          <Text>{item.day.maxtemp_f}°F | {item.day.mintemp_f}°F</Text>
          <Text>{item.day.condition.text}</Text>
          <Image source={{ uri: 'https:' + item.day.condition.icon }} style={styles.weatherIcon} />
        </View>
      );

      return (
        <View style={styles.container}>
          <Text style={styles.title}>This Week's Forecast</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.date}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        margin: 0
    },
    title: {
        fontSize: 25,
        marginBottom: 0,
        padding: 10,
        textAlign: 'center',
    },
    listContainer: {
        width: '100%',
        flexGrow: 1,
    },
    forecastItem: {
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weatherIcon: {
        width: 50,
        height: 50,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
  });

export default ForecastTab;

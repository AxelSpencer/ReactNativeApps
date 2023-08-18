import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useFetch } from './useFetch';

interface WeatherData {
    location: {
        region: string;
        name: string;
    };
    current: {
        temp_f: string;
        feelslike_f: string;
        condition: {
            text: string;
            icon: string;
        };
    };
}

const zipCode = '02861';

const CurrentWeather = () => {
    const { data, loading, error } = useFetch(zipCode);

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

    const { location, current } = data as WeatherData;
    const { region, name } = location;
    const { temp_f, condition, feelslike_f } = current;
    const { icon, text } = condition;

    return (
        <View style={styles.container}>
            <Text style={styles.location}>{name}, {region}</Text>
            <Image style={styles.image} source={{ uri: 'https:' + icon }} />
            <Text style={styles.conditionText}>{text}</Text>
            <Text style={styles.temperature}>{temp_f}°F</Text>
            <Text style={styles.feelsLike}>Feels like {feelslike_f}°F</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    location: {
        fontSize: 25,
        marginBottom: 10,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    conditionText: {
        fontSize: 18,
        marginBottom: 10,
    },
    temperature: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    feelsLike: {
        fontSize: 16,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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

export default CurrentWeather;

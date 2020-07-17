import AsyncStorage from '@react-native-community/async-storage';

function BaseStorage() { }

BaseStorage.prototype.get = async (key) => {
	try {
		const value = await AsyncStorage.getItem(key);
		if (value !== null) {
			return JSON.parse(value);
		}
	} catch (error) {
		// Error retrieving data
	}
};

BaseStorage.prototype.set = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		// Error saving data
	}
};

BaseStorage.prototype.clear = async () => {
	try {
		await AsyncStorage.clear();
	} catch (error) {
		// Error saving data
	}
};

BaseStorage.prototype.remove = async (key) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (error) {
		// Error saving data
	}
};

export default BaseStorage;
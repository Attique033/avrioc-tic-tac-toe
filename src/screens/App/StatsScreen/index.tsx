import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Button from '../../../components/Button';
import {colors} from '../../../theme/colors';
import BackgroundImage from '../../../components/BackgroundImage';
import {useStatsActions} from '../../../store/stats/useStatsActions';
import {useAppSelector} from '../../../store';
import {BlurView} from 'expo-blur';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useAuthActions} from '../../../store/auth/useAuthActions';

const StatsScreen: React.FC = () => {
    const {totalGames, draws, losses, wins} = useAppSelector((state) => state.stats);
    const {logoutUser} = useAuthActions();
    const {getStats} = useStatsActions();

    const bottomBarHeight = useBottomTabBarHeight();

    const style = styles(bottomBarHeight);

    useEffect(() => {
        getStats();
    }, [getStats]);

    return (
        <View style={style.container}>
            <BackgroundImage/>
            <BlurView tint={'light'} intensity={60} style={style.statsContainer}>
                <View style={style.stateRow}>
                    <Text style={style.stateText}>Total Games:</Text>
                    <Text style={style.stateValue}>{totalGames}</Text>
                </View>
                <View style={style.stateRow}>
                    <Text style={style.stateText}>Wins:</Text>
                    <Text style={style.stateValue}>{wins}</Text>
                </View>
                <View style={style.stateRow}>
                    <Text style={style.stateText}>Losses:</Text>
                    <Text style={style.stateValue}>{losses}</Text>
                </View>
                <View style={style.stateRow}>
                    <Text style={style.stateText}>Draws:</Text>
                    <Text style={style.stateValue}>{draws}</Text>
                </View>
            </BlurView>
            <Button text={'Logout'} onPress={logoutUser}/>
        </View>
    );
};

export default StatsScreen;

const styles = (bottomBarHeight: number) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: bottomBarHeight + 8,
            paddingHorizontal: 20,
            backgroundColor: colors.background,
        },
        statsContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            borderRadius: 12,
            overflow: 'hidden',
            alignSelf: 'center',
        },
        stateRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginVertical: 12,
        },
        stateText: {
            fontSize: 20,
            color: colors.text.primary,
            fontWeight: 'semibold',
        },
        stateValue: {
            fontSize: 20,
            color: colors.text.primary,
            fontWeight: 'bold',
        },
    });

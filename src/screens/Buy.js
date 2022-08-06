/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Button,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import RNIap, {
  purchaseUpdatedListener,
  finishTransaction,
  getInstallSourceAndroid,
} from 'react-native-iap';

import {items, subs} from '../conf';
import { useDispatch } from 'react-redux';
import { images } from '../assets';
import {increamentByAmount} from '../redux/pointSlice';

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

export default function App() {
  const [products, setProducts] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const initialIAP = useCallback(async () => {
    try {
      const source = getInstallSourceAndroid();
      setIsLoading(true);
      await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();

      purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
        const receipt = purchase.purchaseToken;
        if (receipt) {
          finishTransaction(purchase, true)
            .then(() => {
              handleCompletePurchase(purchase);
            })
            .catch(() => {
              Alert.alert('purchase is failed', 'the purchase is failed');
            });
        }
      });

      const itemsSku = items.map(item => item.sku);
      const subsSku = subs.map(item => item.sku);

      const res = await RNIap.getProducts(itemsSku);
      const resSubs = await RNIap.getSubscriptions(subsSku);


      setProducts(res);
      setSubscriptions(resSubs);
    } catch (err) {
      Alert.alert(err.message);
      // console.warn(err.code, err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initialIAP();

    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
      }
    };
  }, []);


  const handleCompletePurchase = ({productId}) => {

    switch (productId) {
      case items[0].sku:
        dispatch(increamentByAmount(items[0].value));
        break;
      case items[1].sku:
        dispatch(increamentByAmount(items[1].value));
        break;
      case items[2].sku:
        dispatch(increamentByAmount(items[2].value));
        break;
      case items[3].sku:
        dispatch(increamentByAmount(items[3].value));
        break;
      case subs[0].sku:
        dispatch(increamentByAmount(subs[0].value));
        break;
      case subs[1].sku:
        dispatch(increamentByAmount(subs[1].value));
        break;
      case subs[2].sku:
        dispatch(increamentByAmount(subs[2].value));
        break;
      case subs[3].sku:
        dispatch(increamentByAmount(subs[3].value));
        break;
      default:
        break;
    }
  };

  const handleRequestBuy = productId => {
    RNIap.requestPurchase(productId);
  };

  return (
    <ScrollView
      style={styles.bg}
      contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.labelText}>In-app Purchase</Text>
          <View style={styles.itemList3}>
            {products.map((product, index) => (
              <View style={styles.item3} key={product.productId}>
                <TouchableOpacity
                  onPress={() => handleRequestBuy(product.productId)}
                  style={styles.item3Content}>
                  <Text style={styles.price}>{product.localizedPrice}</Text>
                  <Text style={styles.descr}>{product.description}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Text style={styles.labelText}>Subscriptions</Text>
          <View style={styles.itemList3}>
            {subscriptions.map((product, index) => (
              <View style={styles.item3} key={product.productId}>
                <TouchableOpacity
                  onPress={() => handleRequestBuy(product.productId)}
                  style={styles.item3Content}>
                  <Text style={styles.price}>{product.localizedPrice}</Text>
                  <Text style={styles.descr}>{product.description}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  items: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemsSubs: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    margin: 5,
    width: 150,
    height: 150,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSub: {
    margin: 5,
    width: 150,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  d: {
    width: 30,
    height: 20,
    marginRight: 5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#212121',
  },
  descr: {
    fontSize: 14,
    color: '#212121',
    fontWeight: '500',
  },
  itemList: {},
  item2: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
    elevation: 2,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item2Body: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemList3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  item3: {
    width: '50%',
    padding: 5,
  },
  item3Content: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
    elevation: 2,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
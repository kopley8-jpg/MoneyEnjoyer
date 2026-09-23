import {
  buildCategoryTree,
  NameTreeType,
} from '@/widgets/parties-browser/model/lib/buildCategoryTree';
import { groupBy } from '@/shared/lib/groupBy';
import { typedEntries } from '@/shared/lib/typedEntries';
import { PartyType } from '@/shared/types/transaction';
import React, { useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  IconButton,
  Menu,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

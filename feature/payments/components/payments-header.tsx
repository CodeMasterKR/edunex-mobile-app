import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Modal, FlatList, Pressable,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColors } from '@/hooks/use-theme-color';
import { PaymentSummary } from '../types';

interface Props {
  year: number;
  summary: PaymentSummary;
  onYearChange: (year: number) => void;
}

const YEARS = [2022, 2023, 2024, 2025, 2026, 2027];

function formatAmount(amount: number): string {
  const abs = Math.abs(amount).toLocaleString('uz-UZ');
  return amount >= 0 ? `+${abs}` : `-${abs}`;
}

export function PaymentsHeader({ year, summary, onYearChange }: Props) {
  const c = useThemeColors();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: c.card, borderBottomColor: c.border }]}>
      {/* Top row */}
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: c.text }]}>To'lovlar</Text>

        <TouchableOpacity
          style={[styles.yearBtn, { backgroundColor: c.bg, borderColor: c.border }]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="calendar-outline" size={14} color={c.muted} />
          <Text style={[styles.yearText, { color: c.text }]}>{year}</Text>
          <Ionicons name="chevron-down" size={14} color={c.muted} />
        </TouchableOpacity>
      </View>

      {/* Summary cards */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: '#0d3320' }]}>
          <View style={styles.summaryTop}>
            <Ionicons name="trending-up" size={14} color="#4ade80" />
            <Text style={[styles.summaryLabel, { color: '#4ade80' }]}>TO'LOVLAR</Text>
          </View>
          <Text style={[styles.summaryAmount, { color: '#4ade80' }]}>
            {formatAmount(summary.totalIncome)}
          </Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: '#3a0d0d' }]}>
          <View style={styles.summaryTop}>
            <Ionicons name="trending-down" size={14} color="#f87171" />
            <Text style={[styles.summaryLabel, { color: '#f87171' }]}>QARZLAR</Text>
          </View>
          <Text style={[styles.summaryAmount, { color: '#f87171' }]}>
            {formatAmount(-summary.totalDebt)}
          </Text>
        </View>
      </View>

      {/* Year picker modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <View style={[styles.dropdown, { backgroundColor: c.card, borderColor: c.border }]}>
            <Text style={[styles.dropdownTitle, { color: c.muted }]}>Yilni tanlang</Text>
            <FlatList
              data={YEARS}
              keyExtractor={(y) => y.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.yearItem,
                    item === year && { backgroundColor: c.accent + '20' },
                  ]}
                  onPress={() => {
                    onYearChange(item);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.yearItemText,
                      { color: item === year ? c.accent : c.text },
                    ]}
                  >
                    {item}
                  </Text>
                  {item === year && (
                    <Ionicons name="checkmark" size={16} color={c.accent} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  yearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  yearText: {
    fontSize: 13,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  // Modal
  overlay: {
    flex: 1,
    backgroundColor: '#00000060',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 120,
    paddingRight: 16,
  },
  dropdown: {
    width: 180,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  dropdownTitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.4,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  yearItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  yearItemText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
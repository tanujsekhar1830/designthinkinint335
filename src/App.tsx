/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ShuttleProvider } from './context/ShuttleContext';
import { AlertsScreen } from './screens/AlertsScreen';
import { HelpFeedbackScreen } from './screens/HelpFeedbackScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LastMileScreen } from './screens/LastMileScreen';
import { MapScreen } from './screens/MapScreen';
import { PickupPointScreen } from './screens/PickupPointScreen';
import { RouteStatusScreen } from './screens/RouteStatusScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { WaitingAreaScreen } from './screens/WaitingAreaScreen';

export default function App() {
  return (
    <ShuttleProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/route-status" element={<RouteStatusScreen />} />
          <Route path="/pickup-point" element={<PickupPointScreen />} />
          <Route path="/waiting-area" element={<WaitingAreaScreen />} />
          <Route path="/last-mile" element={<LastMileScreen />} />
          <Route path="/help-feedback" element={<HelpFeedbackScreen />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/alerts" element={<AlertsScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ShuttleProvider>
  );
}

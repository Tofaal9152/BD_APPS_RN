import React from "react";
import { Text } from "react-native";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/src/components/ui/tabs";
import { useAuthStore } from "~/src/store/authStore";
import CompletedRequest from "../../company/CompletedRequest";
import PendingRequests from "../../company/PendingRequests";
const CompanyScreen = () => {
  const [value, setValue] = React.useState("pending");
  const { id } = useAuthStore();
  return (
    <Tabs value={value} onValueChange={setValue} className="w-full">
      {/* Tab List */}
      <TabsList className="flex-row w-full dark:bg-white mb-4 rounded-md">
        <TabsTrigger className="flex-1 dark:bg-white" value="pending">
          <Text className="text-lg font-bold text-[#0F5329]">Pending</Text>
        </TabsTrigger>
        <TabsTrigger className="flex-1 dark:bg-gray-100" value="completed">
          <Text className="text-lg font-bold text-[#0F5329]">Completed</Text>
        </TabsTrigger>
      </TabsList>
      {/* Tab Content */}
      <TabsContent value="pending">
        <PendingRequests />
      </TabsContent>
      <TabsContent value="completed">
        <CompletedRequest id={id} />
      </TabsContent>
    </Tabs>
  );
};

export default CompanyScreen;

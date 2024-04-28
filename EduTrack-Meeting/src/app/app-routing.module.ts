import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CometChatContacts,
  CometChatConversationsWithMessages,
  CometChatConversationsWithMessagesComponent,
} from '@cometchat/chat-uikit-angular';
import { ChatsComponent } from './chats/chats.component';
import { ConversationsDemoComponent } from './chats/conversations-demo/conversations-demo.component';
import { ConversationsWithMessagesDemoComponent } from './chats/conversations-with-messages-demo/conversations-with-messages-demo.component';
import { GroupsDemoComponent } from './groups/groups-demo/groups-demo.component';
import { GroupsWithMessagesDemoComponent } from './groups/groups-with-messages-demo/groups-with-messages-demo.component';
import { GroupsComponent } from './groups/groups.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessageComposerDemoComponent } from './messages/message-composer-demo/message-composer-demo.component';
import { MessageHeaderDemoComponent } from './messages/message-header-demo/message-header-demo.component';
import { MessageListDemoComponent } from './messages/message-list-demo/message-list-demo.component';
import { MessagesDemoComponent } from './messages/messages-demo/messages-demo.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedComponent } from './shared/shared.component';
import { SharedModule } from './shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';

import { UsersDemoComponent } from './users/users-demo/users-demo.component';
import { UsersWithMessagesDemoComponent } from './users/users-with-messages-demo/users-with-messages-demo.component';
import { UsersComponent } from './users/users.component';
import { CreateGroupDemoComponent } from './groups/create-group-demo/create-group-demo.component';
import { JoinGroupDemoComponent } from './groups/join-group-demo/join-group-demo.component';
import { GroupMembersDemoComponent } from './groups/group-members-demo/group-members-demo.component';
import { AddMembersDemoComponent } from './groups/add-members-demo/add-members-democomponent';
import { TransferOwnershipDemoComponent } from './groups/transfer-ownership-demo/transfer-ownership-demo.component';
import { BannedMembersDemoComponent } from './groups/banned-members-demo/banned-members-demo.component';
import { DetailsDemoComponent } from './shared/details-demo/details-demo.component';
import { CallsComponent } from './calls/calls.component';
import { CallButtonsDemoComponent } from './calls/call-buttons-demo/call-buttons-demo.component';
import { ContactsDemoComponent } from './chats/contacts-demo/contacts-demo.component';
import { MessageInformationDemoComponent } from './messages/message-information-demo/message-information-demo.component';
import { CallLogsComponent } from './call-logs/call-logs.component';
import { CallLogsWithDetailsDemoComponent } from './call-logs/call-logs-with-details-demo/call-logs-with-details-demo.component';
import { CallLogDetailsDemoComponent } from './call-logs/call-log-details-demo/call-log-details-demo.component';
import { CallLogsDemoComponent } from './call-logs/call-logs-demo/call-logs-demo.component';
import { CallLogParticipantsDemoComponent } from './call-logs/call-log-participants-demo/call-log-participants-demo.component';
import { CallLogRecordingsDemoComponent } from './call-logs/call-log-recordings-demo/call-log-recordings-demo.component';
import { CallLogHistoryDemoComponent } from './call-logs/call-log-history-demo/call-log-history-demo.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ChatsComponent,
      },
      {
        path: 'shared-module',
        component: SharedComponent,
      },
      {
        path: 'users-module',
        component: UsersComponent,
      },
      {
        path: 'groups-module',
        component: GroupsComponent,
      },
      {
        path: 'chats-module',
        component: ChatsComponent,
      },
      {
        path: 'messages-module',
        component: MessagesComponent,
      },
      {
        path: 'calls-module',
        component: CallsComponent,
      },
      {
        path: 'call-logs-module',
        component: CallLogsComponent,
      },
    ],
  },
  {
    path: 'conversations-with-messages',
    component: ConversationsWithMessagesDemoComponent,
  },
  {
    path: 'contacts',
    component: ContactsDemoComponent,
  },
  {
    path: 'message-information',
    component: MessageInformationDemoComponent,
  },
  {
    path: 'conversations',
    component: ConversationsDemoComponent,
  },
  {
    path: 'users-with-messages',
    component: UsersWithMessagesDemoComponent,
  },
  {
    path: 'users',
    component: UsersDemoComponent,
  },
  {
    path: 'groups-with-messages',
    component: GroupsWithMessagesDemoComponent,
  },
  {
    path: 'groups',
    component: GroupsDemoComponent,
  },
  {
    path: 'messages',
    component: MessagesDemoComponent,
  },
  {
    path: 'message-list',
    component: MessageListDemoComponent,
  },
  {
    path: 'message-header',
    component: MessageHeaderDemoComponent,
  },
  {
    path: 'message-composer',
    component: MessageComposerDemoComponent,
  },
  {
    path: 'create-group',
    component: CreateGroupDemoComponent,
  },
  {
    path: 'join-group',
    component: JoinGroupDemoComponent,
  },
  {
    path: 'group-members',
    component: GroupMembersDemoComponent,
  },
  {
    path: 'add-member',
    component: AddMembersDemoComponent,
  },
  {
    path: 'transfer-ownership',
    component: TransferOwnershipDemoComponent,
  },
  {
    path: 'banned-members',
    component: BannedMembersDemoComponent,
  },
  {
    path: 'details',
    component: DetailsDemoComponent,
  },
  {
    path: 'call-buttons',
    component: CallButtonsDemoComponent,
  },
  {
    path: 'call-logs',
    component: CallLogsDemoComponent,
  },
  {
    path: 'call-logs-with-details',
    component: CallLogsWithDetailsDemoComponent,
  },
  {
    path: 'call-log-details',
    component: CallLogDetailsDemoComponent,
  },
  {
    path: 'call-log-participants',
    component: CallLogParticipantsDemoComponent,
  },
  {
    path: 'call-log-recordings',
    component: CallLogRecordingsDemoComponent,
  },
  {
    path: 'call-log-history',
    component: CallLogHistoryDemoComponent,
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

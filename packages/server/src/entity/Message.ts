import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Listing } from "./Listing";
import { User } from "./User";

@Entity("messages")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  text: string;

  @Column("boolean")
  fromHost: boolean;

  @Column("uuid")
  userIdOfGuest: string;

  @ManyToOne(() => User)
  guestUser: User;

  @Column("uuid")
  userIdOfHost: string;

  @ManyToOne(() => User)
  hostUser: User;

  @Column("uuid")
  listingId: string;

  @ManyToOne(() => Listing)
  listing: Listing;

  // implemented in order to hide userId (interlocutorId) from other party
  @Column("uuid")
  conversationId: string;

  @CreateDateColumn()
  createdDate: Date;
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('m_position')
export class MPosition {
    @PrimaryGeneratedColumn()
    posId: number;

    @Column({ nullable: false })
    posName: string;

    @Column({ nullable: true })
    isActive: boolean;

    @Column({ default: false })
    updateBy: string;
  
    @Column({ default: false })
    createdBy: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
 
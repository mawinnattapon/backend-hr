import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('m_department')
export class MDepartment {
    @PrimaryGeneratedColumn()
    depId: number;

    @Column({ nullable: false })
    depName: string;

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

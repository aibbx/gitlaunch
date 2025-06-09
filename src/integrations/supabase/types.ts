export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      dlmm_pools: {
        Row: {
          created_at: string | null
          current_price: number | null
          developer_fees: number | null
          fee_percentage: number | null
          id: string
          liquidity_sol: number | null
          liquidity_tokens: number | null
          platform_fees: number | null
          project_id: string | null
          token_symbol: string
          total_fees_collected: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_price?: number | null
          developer_fees?: number | null
          fee_percentage?: number | null
          id?: string
          liquidity_sol?: number | null
          liquidity_tokens?: number | null
          platform_fees?: number | null
          project_id?: string | null
          token_symbol: string
          total_fees_collected?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_price?: number | null
          developer_fees?: number | null
          fee_percentage?: number | null
          id?: string
          liquidity_sol?: number | null
          liquidity_tokens?: number | null
          platform_fees?: number | null
          project_id?: string | null
          token_symbol?: string
          total_fees_collected?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dlmm_pools_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          github_score: number | null
          github_username: string | null
          id: string
          programming_languages: string[] | null
          total_commits: number | null
          total_tokens_earned: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          github_score?: number | null
          github_username?: string | null
          id: string
          programming_languages?: string[] | null
          total_commits?: number | null
          total_tokens_earned?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          github_score?: number | null
          github_username?: string | null
          id?: string
          programming_languages?: string[] | null
          total_commits?: number | null
          total_tokens_earned?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          commits: number | null
          created_at: string | null
          description: string | null
          forks: number | null
          id: string
          issues: number | null
          rating: number | null
          repo_name: string
          repo_url: string
          stars: number | null
          status: Database["public"]["Enums"]["project_status"] | null
          token_balance: number | null
          token_symbol: string | null
          total_volume: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          commits?: number | null
          created_at?: string | null
          description?: string | null
          forks?: number | null
          id?: string
          issues?: number | null
          rating?: number | null
          repo_name: string
          repo_url: string
          stars?: number | null
          status?: Database["public"]["Enums"]["project_status"] | null
          token_balance?: number | null
          token_symbol?: string | null
          total_volume?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          commits?: number | null
          created_at?: string | null
          description?: string | null
          forks?: number | null
          id?: string
          issues?: number | null
          rating?: number | null
          repo_name?: string
          repo_url?: string
          stars?: number | null
          status?: Database["public"]["Enums"]["project_status"] | null
          token_balance?: number | null
          token_symbol?: string | null
          total_volume?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assignee_id: string | null
          created_at: string | null
          creator_id: string | null
          description: string
          id: string
          project_id: string | null
          required_skills: string[] | null
          reward_tokens: number
          status: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assignee_id?: string | null
          created_at?: string | null
          creator_id?: string | null
          description: string
          id?: string
          project_id?: string | null
          required_skills?: string[] | null
          reward_tokens: number
          status?: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assignee_id?: string | null
          created_at?: string | null
          creator_id?: string | null
          description?: string
          id?: string
          project_id?: string | null
          required_skills?: string[] | null
          reward_tokens?: number
          status?: Database["public"]["Enums"]["task_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      token_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          project_id: string | null
          task_id: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          project_id?: string | null
          task_id?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          project_id?: string | null
          task_id?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "token_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "token_transactions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      project_status: "pending" | "inner_pool" | "graduated"
      task_status: "open" | "in_progress" | "completed" | "cancelled"
      transaction_type: "task_reward" | "platform_fee" | "burn" | "trade"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      project_status: ["pending", "inner_pool", "graduated"],
      task_status: ["open", "in_progress", "completed", "cancelled"],
      transaction_type: ["task_reward", "platform_fee", "burn", "trade"],
    },
  },
} as const

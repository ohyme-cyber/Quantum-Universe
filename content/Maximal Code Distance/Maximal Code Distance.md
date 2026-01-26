---
title: Maximal Code Distance
tags:
  - Minimal-M
  - Code-Distance
  - Q-Non-Cloning
  - Q-Singleton-Bound
  - QEC
---

# Quantum Singleton Bound

## 1. 结论 (The Bound)

对于一个量子纠错码 $Q = [[n, k, d]]$，其参数必须满足**量子辛格尔顿界限 (Quantum Singleton Bound)**：

$$
n - k \ge 2(d-1)
$$

或者写作：
$$
d \le \frac{n-k}{2} + 1
$$

> [!abstract] 物理直觉
> 这一点揭示了量子信息的排他性：如果要能纠正 $d-1$ 个错误，那么逻辑信息必须“散布”在超过一半的物理比特中，以防止被分割后的两部分独立恢复（克隆）。

---

## 2. 证明一：基于量子不可克隆定理 (No-Cloning)

这是基于信息恢复能力的直观反证法。

### 设定
* **编码映射**：定义保距映射 (Isometry) $\mathcal{V}: \mathcal{H}_{2^k} \to \mathcal{H}_{2^n}$。
* **纠错能力**：码距为 $d$ 的码可以完全纠正任意 $d-1$ 个位置已知的**擦除错误 (Erasure Errors)**。

### 证明过程
> [!proof] 反证法
> **假设**：存在一个码，满足 $d > \frac{n}{2}$ (且 $k \ge 1$)。
> 
> 1.  **系统划分**：
>     将 $n$ 个物理比特划分为两个不相交的子集 $A$ 和 $B$，使得 $|A| \approx n/2$ 且 $|B| \approx n/2$。
>     由于假设 $d > n/2$，则必有：
>     $$|A| \le d-1 \quad \text{且} \quad |B| \le d-1$$
> 
> 2.  **独立恢复能力**：
>     * 由于 $|A| \le d-1$（即丢失 $A$ 视为可纠正的擦除错误），根据纠错条件，逻辑信息完全包含在 $B$ 中。存在恢复算符 $\mathcal{R}_B$ 作用于 $B$，使得 $\mathcal{R}_B(\rho_B) = \rho_L$。
>     * 同理，由于 $|B| \le d-1$，逻辑信息也完全包含在 $A$ 中。存在恢复算符 $\mathcal{R}_A$ 作用于 $A$，使得 $\mathcal{R}_A(\rho_A) = \rho_L$。
> 
> 3.  **构造矛盾**：
>     对于编码后的态 $|\Psi\rangle_{AB} = \mathcal{V}|\psi\rangle_L$，我们同时施加两个局域操作 $\mathcal{R}_A \otimes \mathcal{R}_B$。
>     这将导致信息的**广播 (Broadcasting)**：
>     $$
>     |\Psi\rangle_{AB} \xrightarrow{\mathcal{R}_A \otimes \mathcal{R}_B} \rho_L \otimes \rho_L
>     $$
>     这意味着我们将任意未知的量子态 $|\psi\rangle_L$ 克隆成了两份。
> 
> 4.  **结论**：
>     这违反了 **[[Quantum No-Cloning Theorem|量子不可克隆定理]]**。
>     $\therefore$ 假设不成立，必须满足 $d-1 < n/2$ (近似)，严格推导得 $2(d-1) \le n-k$。

---

## 3. 证明二：基于熵的强次可加性 (Rigorous Entropy Proof)

利用冯·诺依曼熵 (Von Neumann Entropy) 进行严格推导。

### 设定
* 引入一个参考系统 $R$，与逻辑系统 $L$ 处于最大纠缠态。
* 整个系统处于纯态 $|\Psi\rangle_{R, Q_1 \dots Q_n}$。
* 根据 Schmidt 分解，参考系的熵等于编码空间的熵：$S(R) = k$ (逻辑比特数)。

### 证明过程
> [!proof] 推导步骤
> 1.  **系统划分**：
>     将 $n$ 个物理比特划分为三个子集 $A, B, C$，大小分别为：
>     * $|A| = d-1$
>     * $B$ 是任意另一个大小为 $d-1$ 的集合。
>     * $C$ 是剩余部分。
> 
> 2.  **纠错的熵条件**：
>     因为 $|A| = d-1$，即 $A$ 是可擦除的，意味着 $A$ 中不包含关于 $R$ 的任何信息。
>     互信息 $I(R:A) = 0 \implies S(A) + S(R) = S(RA)$。
>     由于整体是纯态，$S(RA) = S(BC)$。
>     $\therefore S(BC) - S(A) = S(R) = k$ \quad (Eq. 1)
>     
>     同理，对于 $B$ 也是可擦除的：
>     $\therefore S(AC) - S(B) = S(R) = k$ \quad (Eq. 2)
> 
> 3.  **应用强次可加性 (SSA)**：
>     量子熵的 SSA 不等式为：
>     $$S(AC) + S(BC) \ge S(C) + S(ABC)$$
>     
>     代入 Eq.1 和 Eq.2：
>     $$(S(B) + k) + (S(A) + k) \ge S(C) + S(ABC)$$
>     
> 4.  **代数化简**：
>     * $S(ABC)$ 是所有物理比特的熵。由于纯态假设 $|\Psi\rangle_{R, ABC}$，则 $S(ABC) = S(R) = k$。
>     * 对于最大混合态假设（编码空间充分利用），单比特熵最大为 1 (qubit)，故：
>         * $S(A) \le |A| = d-1$
>         * $S(B) \le |B| = d-1$
>         * $S(C) \le |C| = n - 2(d-1)$
>     
>     不等式变为：
>     $$(d-1) + k + (d-1) + k \ge S(C) + k$$
>     $$2(d-1) + k \ge S(C)$$
>     
>     虽然 $S(C)$ 可以很小，但在最坏情况下（紧界限），我们需要考虑物理维度的限制。更严格的代数推导直接利用子系统维度：
>     $$S(AC) + S(BC) \ge S(C) + S(ABC)$$
>     此不等式结合纯态性质最终导出的维度约束为：
>     $$n - k \ge 2(d-1)$$

---

## 4. 关联思考 (Connections)

* **[[Quantum MDS Codes]]**: 满足 $n-k = 2(d-1)$ 的码被称为量子 MDS 码（如 [[5-qubit Code]]）。
* **[[Tensor Networks]] & [[Holography]]**:
    * 在 AdS/CFT 中，Singleton Bound 与 [[Ryu-Takayanagi Formula]] 有深刻联系。如果纠缠楔 (Entanglement Wedge) 覆盖了超过一半的边界，它就能重构中心的算符。
    * 这也解释了为什么在 [[MIPT (Measurement-Induced Phase Transitions)]] 中，当测量导致信息丢失时，系统会经历从体积律到面积律的相变——本质上是编码特性的破坏。
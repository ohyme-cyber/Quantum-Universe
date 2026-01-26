---
tags:
  - Holevo-Bound
  - Minimal-M
title: I_QC (Holevo Quantity) vs. Accessible Information
date: 2026-01-26
---
# $I_{QC}$: The Holevo Quantity & Accessible Information

## 1. 物理场景：从测量到系综 (The Physical Scenario)

这是 $I_{QC}$ 在 QET 或量子通信中最典型的产生方式：

1.  **初始状态 (Initial State)**:
    Alice 和 Bob 共享一个（通常是纠缠的）量子态 $\rho_{AB}$。
2.  **Alice 的测量 (Alice's Measurement)**:
    Alice 对系统 $A$ 进行测量（POVM $\{M_k\}$），获得经典结果 $k$（概率 $p_k$）。
    * 此时，Bob 的系统 $B$ 坍缩/更新为条件态 $\rho_B^{(k)}$。
3.  **经典通信 (Classical Communication)**:
    Alice 通过经典信道将结果 $k$ 告知 Bob。
4.  **形成的系综 (Resulting Ensemble)**:
    Bob 现在拥有了关于他系统的一个**经典-量子 (cq) 关联**。对于 Bob 而言，他的系统处于以下系综中：
    $$\mathcal{E} = \{ p_k, \rho_B^{(k)} \}$$

在此场景下，**$I_{QC}$ 描述的就是 Alice 的经典测量结果 $K$ 与 Bob 的量子态 $B$ 之间的互信息。**

---

## 2. $I_{QC}$ (Holevo Quantity $\chi$)

这是描述**Alice 的测量结果与 Bob 量子态之间关联总量**的物理量。

### 数学定义
$$
I_{QC}(K : B) \equiv S(\rho_B) - \sum_k p_k S(\rho_B^{(k)})
$$
* **$S(\rho_B)$**: Bob 在**收到 Alice 电话之前**（或忽略电话内容时），对自己系统状态的总不确定性。
* **$S(\rho_B^{(k)})$**: Bob 在**得知结果 $k$ 之后**，对自己系统状态的剩余不确定性。
* **差值**: Alice 的那通电话（经典信息 $k$）平均为 Bob 消除的关于量子态的熵。

### 物理意义：编码的可区分性
这个量衡量了 Alice 的测量结果 $k$ 把 Bob 的态“区分”得有多好。
* **$I_{QC} = 0$**: Alice 的测量结果与 Bob 的态无关（例如 $\rho_{AB}$ 是乘积态）。Alice 告诉 Bob $k$，Bob 的态也不变。
* **$I_{QC}$ 很大**: 不同的 $k$ 对应着 Bob 极其不同的量子态。

> [!abstract] **关键理解：潜在容量 (Potential Capacity)**
> 即使 Bob **还没有对 $B$ 进行任何测量**，这个 $I_{QC}$ 已经客观存在。它代表了 Alice 手里的经典信息 $K$ 与 Bob 手里的量子系统 $B$ 之间**理论上存在的最大关联**。

---

## 3. $I_{acc}$ (Accessible Information)

这是 Bob 试图**验证** Alice 的结果时能获取的信息量。

### 场景描述
假设 Bob 不相信 Alice，或者想通过测量自己的系统 $B$ 来**猜测** Alice 测到了什么结果 $k$。他选择一个测量方案 $\mathcal{M}$，得到结果 $Y$。

### 数学定义
**可获取信息**定义为 Bob 做最优测量所能获得的经典互信息：
$$
I_{acc}(\mathcal{E}) \equiv \max_{\mathcal{M}} I(K : Y)
$$
即：Alice 的笔记本上的 $k$ 和 Bob 测量出来的 $Y$ 之间的经典关联。

---

## 4. 核心定理：Holevo Bound

$$
I_{acc} \le I_{QC}
$$

### 物理诠释
* **$I_{QC}$ (系综属性)**: Alice 的测量导致 Bob 的态发生的**物理变化**（熵减）的总量。
* **$I_{acc}$ (读取能力)**: Bob 通过单次测量能从这个变化中**提取**出的关于 $k$ 的经典信息。

由于量子力学的非对易性（Bob 为了区分 $\rho_1$ 可能会破坏 $\rho_2$ 的特征），Bob 能够“读出来”的信息 ($I_{acc}$) 通常**小于** Alice 测量所实际建立的物理关联 ($I_{QC}$)。

---

## 5. 总结

| 角色 | 动作/状态 | 对应的信息量 |
| :--- | :--- | :--- |
| **Alice** | 测量 $A$ -> 得到 $k$ -> **造成 $B$ 坍缩** | **创造了 $I_{QC}$** (资源总量) |
| **Bob** | **持有**系综 $\{p_k, \rho_B^{(k)}\}$，暂不测量 | **拥有 $I_{QC}$** (潜在能力) |
| **Bob** | 对 $B$ 进行**测量** -> 得到 $Y$ -> 猜测 $k$ | **提取了 $I_{acc}$** (实际读取) |
